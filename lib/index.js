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
const cfg = config['bedrock-aws'];

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
  if(!(cfg.accessKeyId && cfg.secretAccessKey && cfg.region)) {
    // TODO: improve error
    return callback(new Error('Invalid AWS configuration.'));
  }
  AWS.config.update(cfg);
});

module.exports = AWS;
