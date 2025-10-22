import StringData from '../model/stringSchema.js';
import { analyzeString } from '../utils/stringUtils.js';

// POST /strings
export const createString = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ error: 'Missing "value" field' });
    }

    if (typeof value !== 'string') {
      return res.status(422).json({ error: '"value" must be a string' });
    }

    const properties = analyzeString(value);

    const existing = await StringData.findOne({ 'properties.sha256_hash': properties.sha256_hash });
    if (existing) {
      return res.status(409).json({ error: 'String already exists' });
    }

    const newString = new StringData({
      id: properties.sha256_hash,
      value,
      properties,
    });

    await newString.save();

    return res.status(201).json({
      id: newString.id,
      value: newString.value,
      properties: newString.properties,
      created_at: newString.created_at,
    });
  } catch (error) {
    console.error('Error creating string:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /strings/:value
export const getString = async (req, res) => {
  try {
    const { value } = req.params;
    const data = await StringData.findOne({ value });

    if (!data) {
      return res.status(404).json({ error: 'String not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching string:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /strings
export const getAllStrings = async (req, res) => {
  try {
    const filters = {};
    const {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    } = req.query;

    if (is_palindrome !== undefined) {
      filters['properties.is_palindrome'] = is_palindrome === 'true';
    }
    if (min_length) {
      filters['properties.length'] = { $gte: parseInt(min_length) };
    }
    if (max_length) {
      filters['properties.length'] = {
        ...filters['properties.length'],
        $lte: parseInt(max_length),
      };
    }
    if (word_count) {
      filters['properties.word_count'] = parseInt(word_count);
    }
    if (contains_character) {
      filters.value = { $regex: contains_character, $options: 'i' };
    }

    const data = await StringData.find(filters);

    return res.status(200).json({
      data,
      count: data.length,
      filters_applied: req.query,
    });
  } catch (error) {
    console.error('Error fetching strings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /strings/:value
export const deleteString = async (req, res) => {
  try {
    const { value } = req.params;
    const deleted = await StringData.findOneAndDelete({ value });

    if (!deleted) {
      return res.status(404).json({ error: 'String not found' });
    }

    return res.status(204).json({ message: "string deleted successfully! ✅" });
  } catch (error) {
    console.error('Error deleting string:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
// naturalLanguageController.js

export const filterByNaturalLanguage = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Missing query' });

    const q = query.toLowerCase();
    const filters = {};

    if (q.includes('palindrom')) filters['properties.is_palindrome'] = true;
    if (q.includes('single word')) filters['properties.word_count'] = 1;
    if (/longer than (\d+)/.test(q))
      filters['properties.length'] = { $gt: +q.match(/longer than (\d+)/)[1] };
    if (/shorter than (\d+)/.test(q))
      filters['properties.length'] = { $lt: +q.match(/shorter than (\d+)/)[1] };
    if (/letter ([a-z])/i.test(q))
      filters.value = { $regex: q.match(/letter ([a-z])/i)[1], $options: 'i' };

    if (!Object.keys(filters).length)
      return res.status(400).json({ error: 'Unable to parse natural language query' });

    const data = await StringData.find(filters);
    res.status(200).json({ data, count: data.length, interpreted_query: { original: query, parsed_filters: filters } });
  } catch (e) {
    console.error('NL filter error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
};
