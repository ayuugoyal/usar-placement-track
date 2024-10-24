"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getPlacements } from "@/actions/placement";
import Link from "next/link";

type Record = {
    id: string;
    company_name: string;
    package: number;
    student_count: number;
    created_at: string;
};

type SortField = "company_name" | "package" | "student_count" | "created_at";

export default function Home() {
    const [records, setRecords] = useState<Record[]>([]);
    const [sortField, setSortField] = useState<SortField>("created_at");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await getPlacements();
            const formattedResponse = response.map((record) => ({
                ...record,
                package: Number(record.package),
                student_count: Number(record.student_count),
                created_at: new Date(record.created_at).toISOString(),
            }));
            setRecords(formattedResponse);
        };
        fetchRecords();
    }, []);

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }

        const sortedRecords = [...records].sort((a, b) => {
            if (a[field] < b[field]) return sortDirection === "asc" ? -1 : 1;
            if (a[field] > b[field]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        setRecords(sortedRecords);
    };

    const filteredRecords = records.filter((record) =>
        record.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-primary">
                    USAR GGSIPU Placement Records
                </h1>
                <p className="text-muted-foreground">
                    Explore and sort placement data
                </p>
            </div>

            <div className="flex justify-between items-center flex-col sm:flex-row gap-3">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search company..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    Showing {filteredRecords.length} of {records.length} records
                </p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">
                                <Button
                                    variant="ghost"
                                    onClick={() => handleSort("company_name")}
                                    className="font-bold"
                                >
                                    Company Name
                                    {sortField === "company_name" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="ml-2 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        ))}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={() => handleSort("package")}
                                    className="font-bold"
                                >
                                    Package (LPA)
                                    {sortField === "package" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="ml-2 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        ))}
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    onClick={() => handleSort("student_count")}
                                    className="font-bold"
                                >
                                    Students Placed
                                    {sortField === "student_count" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="ml-2 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        ))}
                                </Button>
                            </TableHead>
                            <TableHead className="text-right">
                                <Button
                                    variant="ghost"
                                    onClick={() => handleSort("created_at")}
                                    className="font-bold"
                                >
                                    Date
                                    {sortField === "created_at" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="ml-2 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        ))}
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRecords.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell className="font-medium">
                                    {record.company_name}
                                </TableCell>
                                <TableCell>
                                    {record.package.toFixed(2)}
                                </TableCell>
                                <TableCell>{record.student_count}</TableCell>
                                <TableCell className="text-right">
                                    {new Date(
                                        record.created_at
                                    ).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-center italic">
                by
                <Link
                    href="https://ayuugoyal.vercel.app/"
                    className="text-blue-800"
                >
                    @ayuugoyal
                </Link>
            </div>
        </div>
    );
}
