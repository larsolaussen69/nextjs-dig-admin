"use client";
import { useState } from "react";
import { List, ListItemButton, ListItemText, Paper, Typography, Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CategoriesData, Exercise, Program } from "@/lib/definitions";
import { motion } from "framer-motion";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

export default function ProgramsPage({ categoriesData }: { categoriesData: CategoriesData }) {
    const [selectedCategory, setSelectedCategory] = useState<string | "">(Object.keys(categoriesData)[0] || ""); // Default to first category
    const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [selectedExerciseDescription, setSelectedExerciseDescription] = useState<string | null>(null);

    // Get programs from selected category
    const programs = selectedCategory ? categoriesData[selectedCategory] || {} : {};

    // Animation settings
    const fadeIn = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
    };

    return (
        <Box sx={{ padding: 3, maxWidth: "100vw", overflow: "hidden" }}>
            <Typography variant="h4" gutterBottom>
                Treningsprogrammer
            </Typography>

            {/* ✅ Category Selector */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Velg kategori</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setSelectedProgram(null);
                        setSelectedExercises([]);
                        setSelectedExerciseDescription(null);
                    }}
                >
                    {Object.keys(categoriesData).map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* ✅ Resizable Panes */}
            <PanelGroup direction="horizontal">
                {/* Programs Pane */}
                <Panel defaultSize={33}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Paper sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
                            <Typography variant="h6" gutterBottom>Programmer</Typography>
                            {selectedCategory ? (
                                <List>
                                    {Object.keys(programs).length > 0 ? (
                                        Object.values(programs).map((program: Program) => (
                                            <ListItemButton
                                                key={program.id}
                                                selected={selectedProgram === program.id}
                                                onClick={() => {
                                                    setSelectedProgram(program.id);
                                                    setSelectedExercises(program.exercises);
                                                    setSelectedExerciseDescription(null);
                                                }}
                                                sx={{
                                                    "&:hover": { backgroundColor: "rgba(0, 0, 255, 0.1)" } // ✅ Light blue hover effect
                                                }}
                                            >
                                                <ListItemText primary={program.name} />
                                            </ListItemButton>
                                        ))
                                    ) : (
                                        <Typography variant="body2" sx={{ ml: 2, color: "gray" }}>
                                            Ingen programmer funnet.
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

                {/* Exercises Pane */}
                <Panel defaultSize={33}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Paper sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
                            <Typography variant="h6" gutterBottom>Øvelser</Typography>
                            {selectedProgram ? (
                                <List>
                                    {selectedExercises.length > 0 ? (
                                        selectedExercises.map((exercise: Exercise) => (
                                            <ListItemButton
                                                key={exercise.id}
                                                onClick={() => setSelectedExerciseDescription(exercise.description)}
                                                sx={{
                                                    "&:hover": { backgroundColor: "rgba(0, 255, 0, 0.1)" } // ✅ Light green hover effect
                                                }}
                                            >
                                                <ListItemText primary={exercise.name} />
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
                                    Velg et program først.
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
                                    variant="body2" // ✅ Smaller font
                                    sx={{ 
                                        marginTop: 2, 
                                        textAlign: "left", // ✅ Left-aligned text 
                                        whiteSpace: "pre-wrap", // ✅ Ensures text wraps properly
                                        wordBreak: "break-word" // ✅ Prevents long words from overflowing
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