
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getArts = async()=>{
    const res = await fetch(`${baseUrl}/api/all-arts`);
    return res.json()
}
