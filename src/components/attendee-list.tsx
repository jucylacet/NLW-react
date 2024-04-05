import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { IconButton } from "./iconButton";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
    const [ search, setSearch ] = useState("")
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());
    
        if (url.searchParams.has("page")) {
          return Number(url.searchParams.get("page"));
        }
    
        return 1;
      });
      const [total ] = useState(0);
      const totalPages = Math.ceil(total / 10);

      function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());
    
        url.searchParams.set("page", String(page));
    
        window.history.pushState({}, "", url);
    
        setPage(page);
      }
    function onSearchInput(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
        setCurrentPage(1);
    }
    function goToFirstPage() {
        setCurrentPage(1);
      }
      function goToLastPage() {
        setCurrentPage(totalPages);
      }
      function goToPreviousPage() {
        setCurrentPage(page - 1);
      }
    function goToNextPage() {
        setCurrentPage(page + 1);
      }
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    < Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInput} className="bg-transparent flex-1 outline-none" placeholder="Buscar participantes"></input>
                </div>
                {search}
            </div>

            <Table>
                <thead>
                    <tr className="borde-b border-white/10">
                        <TableHeader style={{ width: 48 }} >
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10"></input>
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de Inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }} ></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id} className="borde-b border-white/10 hover:bg-white/5">
                                <TableCell >
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10"></input>
                                </TableCell>
                                <TableCell >{attendee.id}</TableCell>
                                <TableCell >
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell >{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell >{dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell >
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                        Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        <TableCell colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div >
    )

}