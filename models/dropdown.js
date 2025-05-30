const mongoose = require('mongoose');

const dropdownOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Religion', 'Caste', 'Sub Caste', 'City', 'Occupation', 'Education']
  },
  value: {
    type: String,
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption',
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('DropdownOption', dropdownOptionSchema);
