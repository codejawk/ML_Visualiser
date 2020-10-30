from channels.generic.websocket import AsyncWebsocketConsumer
import json
import sklearn
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import cross_val_score, LeaveOneOut


class Classification(AsyncWebsocketConsumer):

    async def connect(self):
        self.groupname = 'dashboard'
        await self.channel_layer.group_add(
            self.groupname,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )

    async def receive(self, text_data):
        datapoint = json.loads(text_data)
        print(datapoint)
        Type = datapoint['type']
        x_train = datapoint['x_train']
        y_train = datapoint['y_train']

        await self.channel_layer.group_send(
            self.groupname,
            {
                'type': 'deprocessing',
                'value': [x_train, y_train, Type]

            }
        )

    async def deprocessing(self, event):
        x_train = event['value'][0]
        y_train = event['value'][1]
        Type = event['value'][2]

        if Type == "classification":
            if len(x_train) == 0:
                return

            if len(set(y_train)) <= 1:
                return

            clf = LogisticRegression()
            clf.fit(np.array(x_train), np.array(y_train))

            y_pred = clf.predict(np.array(x_train))
            acc = sklearn.metrics.accuracy_score(np.array(y_train), y_pred)

            w = clf.coef_
            b = clf.intercept_

            x = np.array([0, 1])
            y = -(x*w[0][0] + b)/w[0][1]

            await self.send(text_data=json.dumps({'y1': y[0], 'y2': y[1], 'intercept': clf.intercept_.tolist(), 'slope': clf.coef_.tolist(), 'acc': acc}))
        elif Type == "linear-reg":

            if len(x_train) == 0:
                return

            clf = LinearRegression()
            clf.fit(np.array(x_train).reshape(-1, 1),
                    np.array(y_train).reshape(-1, 1))

            # acc = cross_val_score(clf, np.array(
            #     x_train).reshape(-1, 1), np.array(y_train).reshape(-1, 1), cv=LeaveOneOut())
            acc = clf.score(np.array(x_train).reshape(-1, 1),
                            np.array(y_train).reshape(-1, 1))

            x_test = [0, 1]

            y_pred = clf.predict(np.array(x_test).reshape(-1, 1))
            await self.send(text_data=json.dumps({'y_pred': y_pred.tolist(), 'acc': 1-acc}))

        elif Type == "poly-reg":

            if len(x_train) == 0:
                return

            poly_reg = PolynomialFeatures(degree=4)
            X_poly = poly_reg.fit_transform(np.array(x_train).reshape(-1, 1))

           # print(X_poly)

            poly_reg.fit(X_poly, np.array(y_train))

            clf = LinearRegression()
            clf.fit(X_poly, np.array(y_train).reshape(-1, 1))

            x_test = np.arange(0.0, 1.0, 0.02)

            y_pred = clf.predict(poly_reg.fit_transform(x_test.reshape(-1, 1)))

            acc = clf.score(X_poly, np.array(y_train).reshape(-1, 1))

            await self.send(text_data=json.dumps({'y_pred': y_pred.tolist(), 'x_test': x_test.tolist(), 'acc': acc}))


# theta = clf.coef_.tolist()
# b = clf.intercept_.tolist()

# getting the x co-ordinates of the decision boundary
# plot_x = np.array([0, 1])
# getting corresponding y co-ordinates of the decision boundary
# plot_y = (-1/theta[0][1]) * (theta[0][0] * plot_x + b[0])
