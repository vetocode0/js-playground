"use strict";

module.exports.getRoyce = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Wuddup Royce! AWS Lambda deployed with serverless. Easy as shit!",
                baseUrl: "https://f8kz6cz2uc.execute-api.us-east-1.amazonaws.com/"
            },
            null,
            2
        ),
    };
};