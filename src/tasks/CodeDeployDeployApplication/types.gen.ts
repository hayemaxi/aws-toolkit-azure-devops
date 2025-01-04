
/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

    
/* NOTE! this file is auto-generated by generateResources.ts, do not edit it by hand. */


/*!
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 */

    
/* NOTE! this file is auto-generated by generateResources.ts, do not edit it by hand. */

export type CodeDeployDeployApplicationInput = {
    awsCredentials: string
    regionName: string
    applicationName: string
    deploymentGroupName: string
    deploymentRevisionSource: 'workspace' | 's3'
    revisionBundle: string
    bucketName: string
    bundlePrefix: string
    bundleKey: string
    filesAcl: 'none' | 'private' | 'public-read' | 'public-read-write' | 'authenticated-read' | 'aws-exec-read' | 'bucket-owner-read' | 'bucket-owner-full-control'
    description: string
    fileExistsBehavior: 'DISALLOW' | 'OVERWRITE' | 'RETAIN'
    updateOutdatedInstancesOnly: boolean
    ignoreApplicationStopFailures: boolean
    timeoutInMins: string
    outputVariable: string
    logRequest: boolean
    logResponse: boolean
}

export type CodeDeployDeployApplicationMessages = 
    | 'UploadingBundle'
    | 'BundleUploadCompleted'
    | 'BundleUploadFailed'
    | 'DeployingRevision'
    | 'DeploymentStarted'
    | 'DeploymentError'
    | 'WaitingForDeployment'
    | 'WaitConditionSatisifed'
    | 'DeploymentFailed'
    | 'SettingOutputVariable'
    | 'ApplicationDoesNotExist'
    | 'DeploymentGroupDoesNotExist'
    | 'CreatingDeploymentBundleArchiveFromFolder'
    | 'CreatedBundleArchive'
    | 'ArchiveSize'
    | 'ZipError'
    | 'RevisionBundleDoesNotExist'
    | 'DeletingUploadedBundle'
    | 'TaskCompleted'
    | 'SettingCustomTimeout'
    | 'UnknownRevisionSource'
