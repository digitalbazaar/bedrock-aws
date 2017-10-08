/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const logger = require('./logger');
const path = require('path');
const AWS = require('aws-sdk');

require('./config');

bedrock.events.on('bedrock.configure', () => {
  try {
    require(path.join(process.cwd(), 'aws.config'));
  } catch(e) {
    if(e.message.startsWith('Cannot find module')) {
      return logger.warning('AWS configuration `aws.config.js` not found.');
    }
    throw e;
  }
});

bedrock.events.on('bedrock.start', callback => {
  console.log('CCCCCCCCCCCCCCCc', config.aws);
  if(!(config.aws.accessKeyId && config.aws.secretAccessKey &&
    config.aws.region)) {
    // TODO: improve error
    return callback(new Error('Invalid AWS configuration.'));
  }
  AWS.config.update(config.aws);
});

module.exports = AWS;
