"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "My deployment finally works!!! Get some! I left the platform and header info visible for your curiosity.",
        antLink: "https://f8kz6cz2uc.execute-api.us-east-1.amazonaws.com/ant",
        bryonLink: "https://f8kz6cz2uc.execute-api.us-east-1.amazonaws.com/bryon",
        ikeLink: "https://f8kz6cz2uc.execute-api.us-east-1.amazonaws.com/ike",
        royceLink: "https://f8kz6cz2uc.execute-api.us-east-1.amazonaws.com/royce",
        input: event.headers,
      },
      null,
      2
    ),
  };
};
