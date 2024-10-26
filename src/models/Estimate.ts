// src/models/Estimate.ts

import mongoose from 'mongoose';

const EstimateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technicalDetails: {
    type: String,
    required: true
  },
  timeEstimate: {
    type: String,
    required: true
  },
  costEstimate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Estimate || mongoose.model('Estimate', EstimateSchema);