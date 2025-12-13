const axios = require("axios");

const testGetBookings = async () => {
  try {
    console.log("🔍 Fetching bookings from http://localhost:5001/api/bookings ...");
    const response = await axios.get("http://localhost:5001/api/bookings");
    
    console.log("✅ Status:", response.status);
    console.log("📦 Bookings Found:", response.data.length);
    
    if (response.data.length > 0) {
      console.log("📝 Sample Booking:", JSON.stringify(response.data[0], null, 2));
    } else {
      console.log("⚠️ No bookings found needed to verify population.");
    }

  } catch (error) {
    if (error.response) {
      console.error("❌ API Error:", error.response.status, error.response.data);
    } else {
      console.error("❌ Network Error:", error.message);
    }
  }
};

testGetBookings();
