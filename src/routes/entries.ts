import express from "express";
import { Entry } from "../entities/Entry";
import { getRepository } from "typeorm";

const router = express.Router();

router.get('/api/entries', async (req, res) => {
    try {
        const entries = await Entry.find();

	    return res.status(200).json(entries);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal error."
        });
    }
});

router.get('/api/entries/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await Entry.findOne(parseInt(id));

        if (entry) {
            return res.status(200).json(entry);
        }
    
        return res.status(404).json({
            message: "Entry not found."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal error."
        });
    }
});

router.post('/api/entries', async (req, res) => {
    const {
        english,
        japanese,
        portuguese,
    } = req.body;

    try {
        const entry = Entry.create({
            english: english,
            japanese: japanese,
            portuguese: portuguese,
        })

        await entry.save();

        return res.status(201).json(entry);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal error."
        });
    }
});

router.put('/api/entries/:id', async (req, res) => {
    const { id } = req.params;

    const {
        english,
        japanese,
        portuguese,
    } = req.body;

    try {
        const entryRepository = getRepository(Entry);

        const result = await entryRepository.update(id, { english: english, japanese: japanese, portuguese: portuguese } );

        if (result.affected && result.affected > 0) {
            return res.status(200).json(result);
        }

        return res.status(404).json({
            message: "Entry not found."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal error."
        });
    }
});

router.delete('/api/entries/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const entryRepository = getRepository(Entry);

        const entry = await Entry.findOne(parseInt(id));

        if (entry) {
            entry.remove();
            return res.status(204).json();
        }

        return res.status(404).json({
            message: "Entry not found."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal error."
        });
    }
});

export {
    router as entriesRouter
}