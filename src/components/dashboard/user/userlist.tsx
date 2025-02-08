"use client";

import type * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/definitions";
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Select, MenuItem, InputLabel, Box, TextField, Grid } from "@mui/material";

export default function UserList({ users }: { users: User[] }) {
    const router = useRouter();

    // ✅ Extract unique user groups, ensuring "All" is included
    const userGroups = ["Alle", ...new Set(users.map((user) => user.usergroup))];

    // ✅ State for filtering
    const [selectedGroup, setSelectedGroup] = useState<string>("Alle");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // ✅ Filter users based on group and search
    const filteredUsers = users
        .filter((user) => selectedGroup === "Alle" || user.usergroup === selectedGroup)
        .filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <Box sx={{ padding: "2rem", maxWidth: "1200px", marginLeft: "2rem" }}> {/* ✅ Left-aligned */}
            {/* ✅ Page Title */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
                Brukere
            </Typography>

            {/* ✅ Filters Row: Dropdown + Search */}
            <Grid container spacing={2} sx={{ marginBottom: 2, alignItems: "center" }}>
                {/* Dropdown Filter */}
                <Grid item>
                    <FormControl sx={{ minWidth: "250px" }}>
                        <InputLabel>Velg brukergruppe</InputLabel>
                        <Select
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                        >
                            {userGroups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Search Bar */}
                <Grid item>
                    <TextField
                        label="Søk etter navn eller e-post"
                        variant="outlined"
                        sx={{ width: "300px" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
            </Grid>

            {/* ✅ User Table */}
            <TableContainer component={Paper} sx={{ width: "100%", boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>Navn</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>E-post</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.1)", cursor: "pointer" }
                                    }}
                                    onClick={() => router.push(`users/${user.id}`)} // ✅ Navigate to user details
                                >
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} sx={{ textAlign: "center", color: "gray" }}>
                                    Ingen brukere funnet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}