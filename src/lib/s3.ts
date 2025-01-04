/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

import { S3 } from '@aws-sdk/client-s3'

export async function testBucketExists(s3Client: S3, bucketName: string): Promise<boolean> {
    try {
        await s3Client.headBucket({ Bucket: bucketName })

        return true
    } catch (err) {
        return false
    }
}
