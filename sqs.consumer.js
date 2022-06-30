const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');

const awsAccessKeyId ='test';
const awsRegion='us-east-1'  // other regions don't seem to work
const awsSecretAccessKey='test';

const sqs = new AWS.SQS({
  accessKeyId:  awsAccessKeyId,
  secretAccessKey:  awsSecretAccessKey,
  region: awsRegion,
  apiVersion: '2012-11-05',
  endpoint: 'http://localhost:4566', // localstack
});

const queueUrl = "http://localhost:4566/000000000000/hyperlearn-queue"; //"https://sqs.ap-south-1.amazonaws.com/083378476485/devsnest_edu.fifo";


const consumer = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: async (message) => {
    console.log(message)
  },
  sqs: sqs
});

consumer.on('error', (err) => {
  console.error(err.message);
});

consumer.on('processing_error', (err) => {
  console.error(err.message);
});

consumer.start();
