# prediction_percentage = model.predict_proba(data_of_new_patient)
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier
import os

# get the path name of current working directory
path = os.getcwd()
print("path", path)

data_asthma = pd.read_csv(path + "/genaimech/model/data/asthma.csv")
data_cancer = pd.read_csv(path + "/genaimech/model/data/cancer.csv")
data_diabetes = pd.read_csv(path + "/genaimech/model/data/diabetes.csv")
data_stroke = pd.read_csv(path + "/genaimech/model/data/stroke.csv")


class Model:
    def __init__(self):
        self.XGBClassifier_model_asthma = XGBClassifier()
        self.XGBClassifier_model_cancer = XGBClassifier()
        self.XGBClassifier_model_diabetes = XGBClassifier()
        self.XGBClassifier_model_stroke = XGBClassifier()

        X_asthma = data_asthma.drop('target', axis=1)
        y_asthma = data_asthma['target']
        self.XGBClassifier_model_asthma.fit(X_asthma, y_asthma)

        X_cancer = data_cancer.drop('target', axis=1)
        y_cancer = data_cancer['target']
        self.XGBClassifier_model_cancer.fit(X_cancer, y_cancer)

        X_diabetes = data_diabetes.drop('target', axis=1)
        y_diabetes = data_diabetes['target']
        self.XGBClassifier_model_diabetes.fit(X_diabetes, y_diabetes)

        X_stroke = data_stroke.drop('target', axis=1)
        y_stroke = data_stroke['target']
        self.XGBClassifier_model_stroke.fit(X_stroke, y_stroke)


def get_predict_percentage_asthma(self, data_of_new_patient):
    model = self.XGBClassifier_model_asthma
    data_of_new_patient = np.array(data_of_new_patient).reshape(1, -1)
    prediction_percentage = model.predict_proba(data_of_new_patient)
    return prediction_percentage


def get_predict_percentage_cancer(self, data_of_new_patient):
    model = self.XGBClassifier_model_cancer
    data_of_new_patient = np.array(data_of_new_patient).reshape(1, -1)
    prediction_percentage = model.predict_proba(data_of_new_patient)
    return prediction_percentage


def get_predict_percentage_diabetes(self, data_of_new_patient):
    model = self.XGBClassifier_model_diabetes
    data_of_new_patient = np.array(data_of_new_patient).reshape(1, -1)
    prediction_percentage = model.predict_proba(data_of_new_patient)
    return prediction_percentage


def get_predict_percentage_stroke(self, data_of_new_patient):
    model = self.XGBClassifier_model_stroke
    data_of_new_patient = np.array(data_of_new_patient).reshape(1, -1)
    prediction_percentage = model.predict_proba(data_of_new_patient)
    return prediction_percentage
