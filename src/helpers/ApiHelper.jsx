const postData = async (url = "", data = {}, token = "") => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export default postData;
