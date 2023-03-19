import React from 'react'
import { TextField } from "@mui/material";

export default function Input(props) {

    const { name, label, value, error=null, onChange } = props;
    // error 紀錄是否有錯誤之物件, helperText : 可以塞錯誤訊息
    return (
        <TextField
            variant="standard"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            sx={{ marginBottom: 1.5, marginTop: 2}}
            // error 是用來設置如果有錯誤發生之物件
            // helperText 顯示之錯誤資訊
            // 這行就是判斷 error obj 如果不是空代表有錯誤, 就把 error 設置給 helperText
            {...(error && {error:true, helperText:error})}
        />
    )
}
