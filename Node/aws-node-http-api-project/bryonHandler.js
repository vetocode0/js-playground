"use string";

module.exports.getBryon = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Hello sir! Next step is building CodePipleine and gitLab deployment pipelines."
            },
            null,
            2
        ),
    };
};