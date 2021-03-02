export default async function postRequest(url = "", data = {}, token = "") {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}
export async function getRequest(url = "", token = "") {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
        },
    });
    return response.json();
}
