FROM nikolaik/python-nodejs:latest

WORKDIR /home/src/app

# Bundle app source
COPY . .

RUN pip install pandas
RUN npm install
RUN pip install joblib
RUN pip install -U scikit-learn

EXPOSE 9070
CMD [ "npm", "start" ]