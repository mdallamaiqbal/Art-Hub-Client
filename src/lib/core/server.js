import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const authHeader= async()=>{
  const token = await getUserToken();
  const header= token ? {
    authorization: `Bearer ${token}`
  } : {}
  return header
}

export const serverFetch = async(path)=>{
  const res = await fetch(`${baseUrl}${path}`);
  return res.json()
}

export const protectedFetch = async(path)=>{
  const res = await fetch(`${baseUrl}${path}`,
    {
      headers: await authHeader()
    }
  );

  return handleStatus(res)
}

export const serverMutation = async(path,data)=>{
  const res = await fetch(`${baseUrl}${path}`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      ... await authHeader()
    },
    body: JSON.stringify(data)
  })
  return handleStatus(res)
}

const handleStatus=res=>{
  if(res.status === 401){
    redirect('/unauthorized')
  }
  if(res.status === 403){
    redirect('/forbidden')
  }
  return res.json()
}