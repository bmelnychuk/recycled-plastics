import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';

const vercelProjectId = 'prj_KbEXjqEOPA8VH4yIgpdx4krtdP1o';
const teamSlug = 'bmelnychuk-private';

export class AppStack extends cdk.Stack {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.table = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY
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

    this.table.grantReadWriteData(role);

    new cdk.CfnOutput(this, 'VercelRoleArn', {
      value: role.roleArn,
      description: 'Role ARN for Vercel OIDC access',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: this.table.tableName,
      description: 'DynamoDB table name',
    });
  }
}
