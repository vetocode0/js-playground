"use strict";

module.exports.getIke = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Sup foo! Testing server deployments and such. What are you up to?",
                baseUrl: "https://f8kz6cz2uc.execute-api.us-east-1.amazonaws.com/"
            },
            null,
            4
        ),
    };
};