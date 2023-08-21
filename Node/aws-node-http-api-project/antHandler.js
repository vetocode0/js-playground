"use string";

module.exports.getAnt = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Customized endpoint. Improving base design quite a bit."
            },
            null,
            2
        ),
    };
};