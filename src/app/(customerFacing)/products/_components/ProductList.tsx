"use client"

type valueProp = {
    value:string
}

export function ProductList({value}:valueProp){
    
      return (
        <>
        <div>
          <p>{value}</p>
        </div>
        </>
      );
    }