/*
    Copyright 2015 IBM Corp. All Rights Reserved
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

// This object should contain the results
// of Issuing service setup

var issue_config = {
  "issuer_data": {
    "specifications": [
      {
        "specificationUID": "idmx:bluemix://movies.mybluemix.net/specifications?type=credential,name=voucher,version=1",
        "userFriendlyName": " Streaming Subscription ",
        "params": [
          {
            "friendlyAttributeName": [
              {
                "value": "Issuance Date",
                "lang": "en"
              }
            ],
            "type": "idmx:bluemix://movies.mybluemix.net/attributes?name=issue",
            "dataType": "xs:dateTime",
            "encoding": "urn:abc4trust:1.0:encoding:dateTime:unix:signed"
          },
          {
            "friendlyAttributeName": [
              {
                "value": "Expiration Date",
                "lang": "en"
              }
            ],
            "type": "idmx:bluemix://movies.mybluemix.net/attributes?name=expire",
            "dataType": "xs:dateTime",
            "encoding": "urn:abc4trust:1.0:encoding:dateTime:unix:signed"
          }
        ],
        "policyUid": "idmx:bluemix://idmx-directory.mybluemix.net/policies?type=issuance,name=mplex_example_issuer_streaming_subscription,version=1"
      }
    ],
    "parametersUID": "idmx:bluemix://idmx-directory.mybluemix.net/parameters?type=issuer,name=mplex-example-issuer,version=1"
  },
  "verifier_data": null
};
