import React, { useState } from "react";
import "./App.css";

function App() {
  const [nama, setNama] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [hasil, setHasil] = useState(null);

  const submitForm = () => {
    const usia = hitungUsia(tglLahir);

    const zodiac = getZodiacName(tglLahir);

    setHasil({
      nama,
      usia,
      zodiac,
    });
  };

  const hitungUsia = (tglLahir) => {
    const tglLahirObj = new Date(tglLahir);
    const today = new Date();
    const diff = today - tglLahirObj;

    const usia = new Date(diff);

    return {
      tahun: usia.getUTCFullYear() - 1970,
      bulan: usia.getUTCMonth(),
      hari: usia.getUTCDate() - 1,
    };
  };

  const getZodiacName = (tglLahir) => {
    const tZodiac = [
      { startDate: "12-22", endDate: "01-20", name: "Capricorn" },
      { startDate: "01-21", endDate: "02-19", name: "Aquarius" },
      { startDate: "02-20", endDate: "03-20", name: "Pisces" },
      { startDate: "03-21", endDate: "04-20", name: "Aries" },
      { startDate: "04-21", endDate: "05-20", name: "Taurus" },
      { startDate: "05-21", endDate: "06-20", name: "Gemini" },
      { startDate: "06-21", endDate: "07-22", name: "Cancer" },
      { startDate: "07-23", endDate: "08-22", name: "Leo" },
      { startDate: "08-23", endDate: "09-22", name: "Virgo" },
      { startDate: "09-23", endDate: "10-22", name: "Libra" },
      { startDate: "10-23", endDate: "11-22", name: "Scorpio" },
      { startDate: "11-23", endDate: "12-21", name: "Sagittarius" },
    ];

    const birthDate = new Date(tglLahir);
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const birthDateString = (birthMonth < 10 ? "0" : "") + birthMonth + "-" + (birthDay < 10 ? "0" : "") + birthDay;

    for (let i = 0; i < tZodiac.length; i++) {
      const startDate = tZodiac[i].startDate;
      const endDate = tZodiac[i].endDate;

      if (birthDateString >= startDate && birthDateString <= endDate) {
        return tZodiac[i].name;
      }
    }

    return "Zodiac anda Capricorn";
  };

  return (
    <div className="App">
      <h2>Form Astrologi</h2>
      <form>
        Nama: <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
        <br />
        Tanggal Lahir: <input type="date" value={tglLahir} onChange={(e) => setTglLahir(e.target.value)} required />
        <br />
        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>

      {hasil && (
        <div id="resultContainer">
          <h2>Hallo {hasil.nama},</h2>
          <p>
            Usia anda saat ini adalah: {hasil.usia.tahun} Tahun, {hasil.usia.bulan} Bulan, {hasil.usia.hari} Hari
          </p>
          <p>Bintang anda adalah {hasil.zodiac}</p>
        </div>
      )}
    </div>
  );
}

export default App;
