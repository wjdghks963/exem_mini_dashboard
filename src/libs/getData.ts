
export async function getData<T>(url:string):Promise<T> {
    const response = await fetch(url).then(res=>res.json());

    return response as T;
}