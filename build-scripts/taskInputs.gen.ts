/**
 * This file keeps a record of task input names for each task. We validate the current task inputs
 * against this to guard against accidentally changing or removing the input tasks.
 *
 * This should **only** be modified to pass the validation if migrations steps are in place. Otherwise,
 * users could be broken by having the changed fields specified in their current pipelines/templates.
 *
 * Example of this issue: https://github.com/aws/aws-toolkit-azure-devops/issues/572
 *
 * Migration:
 * - keep the old parameter but add the new parameter. You can read the new parameter first, then the old one.
 * - mark the display name of the old parameter *deprecated*, or hide it from visibily (needs verification)
 */

export const records = {
    AWSCLI: ['awsCredentials', 'regionName', 'awsCommand', 'awsSubCommand', 'awsArguments', 'failOnStandardError'],
    AWSPowerShellModuleScript: [
        'awsCredentials',
        'regionName',
        'arguments',
        'scriptType',
        'filePath',
        'inlineScript',
        'errorActionPreference',
        'failOnStderr',
        'ignoreLASTEXITCODE',
        'workingDirectory'
    ],
    AWSShellScript: [
        'awsCredentials',
        'regionName',
        'arguments',
        'scriptType',
        'filePath',
        'inlineScript',
        'disableAutoCwd',
        'workingDirectory',
        'failOnStandardError'
    ],
    BeanstalkCreateApplicationVersion: [
        'awsCredentials',
        'regionName',
        'applicationName',
        'applicationType',
        'webDeploymentArchive',
        'dotnetPublishPath',
        'deploymentBundleBucket',
        'deploymentBundleKey',
        'versionLabel',
        'description',
        'outputVariable',
        'logRequest',
        'logResponse'
    ],
    BeanstalkDeployApplication: [
        'awsCredentials',
        'regionName',
        'applicationName',
        'environmentName',
        'applicationType',
        'webDeploymentArchive',
        'dotnetPublishPath',
        'deploymentBundleBucket',
        'deploymentBundleKey',
        'versionLabel',
        'description',
        'outputVariable',
        'eventPollingDelay',
        'logRequest',
        'logResponse'
    ],
    CloudFormationCreateOrUpdateStack: [
        'awsCredentials',
        'regionName',
        'stackName',
        'templateSource',
        'templateFile',
        's3BucketName',
        's3ObjectKey',
        'templateUrl',
        'templateParametersSource',
        'templateParametersFile',
        'templateParameters',
        'useChangeSet',
        'changeSetName',
        'description',
        'includeNestedStacks',
        'autoExecuteChangeSet',
        'capabilityIAM',
        'capabilityNamedIAM',
        'capabilityAutoExpand',
        'roleARN',
        'resourceTypes',
        'notificationARNs',
        'tags',
        'monitorRollbackTriggers',
        'monitoringTimeInMinutes',
        'rollbackTriggerARNs',
        'onFailure',
        'disableRollback',
        'warnWhenNoWorkNeeded',
        'outputVariable',
        'captureStackOutputs',
        'captureAsSecuredVars',
        'timeoutInMins',
        'logRequest',
        'logResponse'
    ],
    CloudFormationDeleteStack: ['awsCredentials', 'regionName', 'stackName', 'logRequest', 'logResponse'],
    CloudFormationExecuteChangeSet: [
        'awsCredentials',
        'regionName',
        'changeSetName',
        'stackName',
        'noFailOnEmptyChangeSet',
        'deleteEmptyChangeSet',
        'outputVariable',
        'captureStackOutputs',
        'captureAsSecuredVars',
        'logRequest',
        'logResponse'
    ],
    CodeDeployDeployApplication: [
        'awsCredentials',
        'regionName',
        'applicationName',
        'deploymentGroupName',
        'deploymentRevisionSource',
        'revisionBundle',
        'bucketName',
        'bundlePrefix',
        'bundleKey',
        'filesAcl',
        'description',
        'fileExistsBehavior',
        'updateOutdatedInstancesOnly',
        'ignoreApplicationStopFailures',
        'timeoutInMins',
        'outputVariable',
        'logRequest',
        'logResponse'
    ],
    ECRPullImage: [
        'awsCredentials',
        'regionName',
        'repository',
        'imageSource',
        'imageTag',
        'imageDigest',
        'outputVariable',
        'logRequest',
        'logResponse'
    ],
    ECRPushImage: [
        'awsCredentials',
        'regionName',
        'imageSource',
        'sourceImageName',
        'sourceImageTag',
        'sourceImageId',
        'repositoryName',
        'pushTag',
        'autoCreateRepository',
        'forceDockerNamingConventions',
        'removeDockerImage',
        'outputVariable',
        'logRequest',
        'logResponse'
    ],
    LambdaDeployFunction: [
        'awsCredentials',
        'regionName',
        'deploymentMode',
        'functionName',
        'description',
        'functionHandler',
        'runtime',
        'codeLocation',
        'localZipFile',
        's3Bucket',
        's3ObjectKey',
        's3ObjectVersion',
        'roleARN',
        'memorySize',
        'timeout',
        'publish',
        'layers',
        'deadLetterARN',
        'kmsKeyARN',
        'environment',
        'tags',
        'securityGroups',
        'subnets',
        'tracingConfig',
        'outputVariable',
        'logRequest',
        'logResponse'
    ],
    LambdaInvokeFunction: [
        'awsCredentials',
        'regionName',
        'functionName',
        'payload',
        'invocationType',
        'outputVariable',
        'logType',
        'logRequest',
        'logResponse'
    ],
    LambdaNETCoreDeploy: [
        'awsCredentials',
        'regionName',
        'command',
        'packageOnly',
        'packageOutputFile',
        'lambdaProjectPath',
        'functionName',
        'functionRole',
        'functionHandler',
        'functionMemory',
        'functionTimeout',
        'stackName',
        's3Bucket',
        's3Prefix',
        'additionalArgs'
    ],
    S3Download: [
        'awsCredentials',
        'regionName',
        'bucketName',
        'sourceFolder',
        'globExpressions',
        'targetFolder',
        'keyManagement',
        'customerKey',
        'overwrite',
        'forcePathStyleAddressing',
        'flattenFolders',
        'logRequest',
        'logResponse'
    ],
    S3Upload: [
        'awsCredentials',
        'regionName',
        'bucketName',
        'sourceFolder',
        'globExpressions',
        'targetFolder',
        'filesAcl',
        'createBucket',
        'keyManagement',
        'encryptionAlgorithm',
        'kmsMasterKeyId',
        'customerKey',
        'flattenFolders',
        'contentType',
        'contentEncoding',
        'storageClass',
        'forcePathStyleAddressing',
        'cacheControl',
        'logRequest',
        'logResponse'
    ],
    SecretsManagerCreateOrUpdateSecret: [
        'awsCredentials',
        'regionName',
        'secretNameOrId',
        'description',
        'secretValueSource',
        'secretValue',
        'secretValueType',
        'secretValueFile',
        'kmsKeyId',
        'autoCreateSecret',
        'tags',
        'arnOutputVariable',
        'versionIdOutputVariable',
        'logRequest',
        'logResponse'
    ],
    SecretsManagerGetSecret: [
        'awsCredentials',
        'regionName',
        'secretIdOrName',
        'variableName',
        'versionId',
        'versionStage',
        'logRequest',
        'logResponse'
    ],
    SendMessage: [
        'awsCredentials',
        'regionName',
        'messageTarget',
        'message',
        'topicArn',
        'queueUrl',
        'delaySeconds',
        'logRequest',
        'logResponse'
    ],
    SystemsManagerGetParameter: [
        'awsCredentials',
        'regionName',
        'readMode',
        'parameterName',
        'parameterVersion',
        'parameterPath',
        'recursive',
        'singleNameTransform',
        'hierarchyNameTransform',
        'customVariableName',
        'replacementPattern',
        'replacementText',
        'globalMatch',
        'caseInsensitiveMatch',
        'logRequest',
        'logResponse'
    ],
    SystemsManagerRunCommand: [
        'awsCredentials',
        'regionName',
        'documentName',
        'documentParameters',
        'comment',
        'serviceRoleARN',
        'instanceSelector',
        'instanceIds',
        'instanceTags',
        'instanceBuildVariable',
        'maxConcurrency',
        'maxErrors',
        'timeout',
        'notificationArn',
        'notificationEvents',
        'notificationType',
        'outputS3BucketName',
        'outputS3KeyPrefix',
        'commandIdOutputVariable',
        'cloudWatchOutputEnabled',
        'cloudWatchLogGroupName',
        'logRequest',
        'logResponse'
    ],
    SystemsManagerSetParameter: [
        'awsCredentials',
        'regionName',
        'parameterName',
        'parameterType',
        'parameterValue',
        'encryptionKeyId',
        'logRequest',
        'logResponse'
    ]
}