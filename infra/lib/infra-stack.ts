import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Distribution } from '@aws-cdk/aws-cloudfront';
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'front-app', {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    new BucketDeployment(this, 'front-app-deployment', {
      destinationBucket: bucket,
      sources: [Source.asset(path.join('..', 'build'))],
    });

    const distribution = new Distribution(this, 'front-app-distribution', {
      defaultBehavior: { origin: new S3Origin(bucket) },
    });
  }
}
