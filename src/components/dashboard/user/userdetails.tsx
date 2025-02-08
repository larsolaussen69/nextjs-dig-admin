"use client";

import type * as React from "react";
import { useState } from "react";
import { Box, Grid, List, ListItem, ListItemText, Typography, Paper, FormControl, InputLabel, ListItemButton, MenuItem, Select } from "@mui/material";
import { SplitCategory, User, UserExercise } from "@/lib/definitions";
import { motion } from "framer-motion";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

export default function UserDetails({
    user,
    splitCategories
}: {
    user: User;
    splitCategories: SplitCategory[]
}) {
    const [selectedCategory, setSelectedCategory] = useState<string | "">(Object.keys(splitCategories)[0] || "")
    const [selectedExercises, setSelectedExercises] = useState<UserExercise[]>([]);
    const [selectedExerciseDescription, setSelectedExerciseDescription] = useState<string | null>(null);


    // ✅ Find the selected category’s exercises
    const handleCategoryChange = (category: string) => {
        const categoryData = splitCategories.find((c) => c.split_category === category);
        setSelectedCategory(category);
        setSelectedExercises(categoryData ? categoryData.exercises : []);
        setSelectedExerciseDescription(null);
    };

    // ✅ Animation settings
    const fadeIn = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    };

    return (
        <Box sx={{ padding: 3, maxWidth: "100vw", overflow: "hidden" }}>
            <Typography variant="h4" gutterBottom>
                {user.name}
            </Typography>

            {/* ✅ Split Category Selector */}
            {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Velg Split-Kategori</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    {splitCategories.map((category) => (
                        <MenuItem key={category.split_category} value={category.split_category}>
                            {category.split_category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}

            {/* ✅ Resizable Panes */}
            <PanelGroup direction="horizontal">
                {/* Split Category Pane */}
                <Panel defaultSize={33}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Paper sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
                            <Typography variant="h6" gutterBottom>Split-Kategorier</Typography>
                            {splitCategories.length > 0 ? (
                                <List>
                                    {splitCategories.map((category) => (
                                        <ListItemButton
                                            key={category.split_category}
                                            selected={selectedCategory === category.split_category}
                                            onClick={() => handleCategoryChange(category.split_category)}
                                            sx={{
                                                "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.1)" }
                                            }}
                                        >
                                            <ListItemText primary={category.split_category} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            ) : (
                                <Typography variant="body2" sx={{ ml: 2, color: "gray" }}>
                                    Ingen kategorier funnet.
                                </Typography>
                            )}
                        </Paper>
                    </motion.div>
                </Panel>

                {/* Resizable Handle */}
                <PanelResizeHandle />

                {/* Exercises Pane */}
                <Panel defaultSize={33}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Paper sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
                            <Typography variant="h6" gutterBottom>Øvelser</Typography>
                            {selectedCategory ? (
                                <List>
                                    {selectedExercises.length > 0 ? (
                                        selectedExercises.map((exercise) => (
                                            <ListItemButton
                                                key={exercise.user_exercise_id}
                                                onClick={() => setSelectedExerciseDescription(exercise.exercise_description)}
                                                sx={{
                                                    "&:hover": { backgroundColor: "rgba(0, 255, 0, 0.1)" }
                                                }}
                                            >
                                                <ListItemText primary={exercise.exercise_name} />
                                            </ListItemButton>
                                        ))
                                    ) : (
                                        <Typography variant="body2" sx={{ ml: 2, color: "gray" }}>
                                            Ingen øvelser funnet.
                                        </Typography>
                                    )}
                                </List>
                            ) : (
                                <Typography variant="body2" sx={{ ml: 2, color: "gray" }}>
                                    Velg en kategori først.
                                </Typography>
                            )}
                        </Paper>
                    </motion.div>
                </Panel>

                {/* Resizable Handle */}
                <PanelResizeHandle />

                {/* Exercise Details Pane */}
                <Panel defaultSize={33}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Paper sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
                            <Typography variant="h6" gutterBottom>Beskrivelse</Typography>
                            {selectedExerciseDescription ? (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        marginTop: 2,
                                        textAlign: "left",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {selectedExerciseDescription}
                                </Typography>
                            ) : (
                                <Typography variant="body2" sx={{ marginTop: 2, color: "gray" }}>
                                    Velg en øvelse for å se beskrivelse.
                                </Typography>
                            )}
                        </Paper>
                    </motion.div>
                </Panel>
            </PanelGroup>
        </Box>
    );
}