import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';

const teamSlug = 'bmelnychuk-private';

export class AppStack extends cdk.Stack {
  constructor(
    env: string,
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const mainTable = new dynamodb.Table(this, 'MainTable', {
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      deletionProtection: true,
    });
    mainTable.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'GSI1_PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI1_SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    const publicBucket = new s3.Bucket(this, 'PublicBucket', {
      bucketName: `rp-public-${env}-${this.account}`,
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      versioned: false,
      cors: [
        {
          allowedMethods: [HttpMethods.HEAD, HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: ['*'],
          allowedHeaders: ['Authorization', '*'],
        },
      ],
    });

    const communicationTable = new dynamodb.Table(this, 'CommunicationTable', {
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      deletionProtection: true,
    });

    const role = new iam.Role(this, 'VercelOidcRole', {
      assumedBy: new iam.WebIdentityPrincipal(
        `arn:aws:iam::${this.account}:oidc-provider/oidc.vercel.com/bmelnychuk-private`,
        {
          StringEquals: {
            [`oidc.vercel.com/${teamSlug}:aud`]: `https://vercel.com/${teamSlug}`,
          },
          StringLike: {
            [`oidc.vercel.com/${teamSlug}:sub`]: [
              `owner:${teamSlug}:project:*:environment:preview`,
              `owner:${teamSlug}:project:*:environment:production`,
            ],
          },
        },
      ),
    });

    mainTable.grantReadWriteData(role);
    publicBucket.grantReadWrite(role);
    communicationTable.grantReadWriteData(role);

    new cdk.CfnOutput(this, 'VercelRoleArn', {
      value: role.roleArn,
      description: 'Role ARN for Vercel OIDC access',
    });

    new cdk.CfnOutput(this, 'MainTableName', {
      value: mainTable.tableName,
      description: 'MainTable name',
    });

    new cdk.CfnOutput(this, 'CommunicationTableName', {
      value: communicationTable.tableName,
      description: 'CommunicationTable name',
    });

    new cdk.CfnOutput(this, 'PublicBucketName', {
      value: publicBucket.bucketName,
      description: 'PublicBucket name',
    });
  }
}
