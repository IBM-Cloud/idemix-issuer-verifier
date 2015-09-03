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
        "policyUid": "idmx:bluemix://idmx-directory.mybluemix.net/policies?type=issuance,name=pb_issuer_streaming_subscription,version=1"
      }
    ],
    "parametersUID": "idmx:bluemix://idmx-directory.mybluemix.net/parameters?type=issuer,name=pb-issuer,version=1"
  }
};