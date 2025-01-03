import { CartItem } from "../types/cartTypes"

export const sumCartItemSellingPrice=(items:CartItem[]):number=>{

   
    return items.reduce((acc, item)=>{return item?.sellingPrice+acc},0)

}

export const sumCartItemMrpPrice=(items:CartItem[]):number=>{
    
    return items.reduce((acc, item)=>{return item?.mrpPrice+acc},0)
}

export const calculateDiscountPercent = (mrpPrice, sellingPrice) => {
    if (mrpPrice <= 0) return 0;
    return Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);
};
