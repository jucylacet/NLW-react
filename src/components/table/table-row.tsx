import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'>{}

export function TableRow(props: TableRowProps){
    return (
        <tr className="borde-b border-white/10 hover:bg-white/5" {...props}/>
    )
}