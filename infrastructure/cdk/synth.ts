import * as cdk from 'aws-cdk-lib';
import { AppStack } from './lib/app-stack';

const staging = 'staging';
const env = staging;

const app = new cdk.App();
new AppStack(env, app, `recycled-plastics-api-${env}`);

app.synth();
