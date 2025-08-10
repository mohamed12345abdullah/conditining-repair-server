const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // عنوان الشقة
  description: { type: String }, // وصف
  location: { 
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }, // سعر الإيجار الأساسي

  deposit: { 
    type: Number,
    default: 0
  }, // العربون
  consumption: { // متوسط استهلاك الخدمات
    type: Number,
    required: true
  },
  rooms: { type: Number },
  category: {
    type: String,
    enum: ['economic', 'medium', 'luxury'],
    required: true
  },
  features: [String],
  images: [String],
  transportation: { // المواصلات
    timeMinutes: { type: Number, default: 0 }, // وقت المواصلات بالدقايق
    cost: { type: Number, default: 0 } // تكلفة المواصلات
  },
  insurance: { type: Number, default: 0 }, // مبلغ التأمين
  contact: {
    name: { type: String },
    phone: { type: String },
    email: { type: String }
  },
  available: { type: Boolean, default: true },
  internet: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Apartment', apartmentSchema);
