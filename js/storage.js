

const StorageController = {

    KEYS: {
        RESIDENTS: "caretrack_residents",
        HEALTH_RECORDS: "caretrack_health_records",
        MEDICINES: "caretrack_medicines"
    },

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    getResidents() {
        return this.get(this.KEYS.RESIDENTS);
    },

    saveResidents(data) {
        this.save(this.KEYS.RESIDENTS, data);
    },

    getHealthRecords() {
        return this.get(this.KEYS.HEALTH_RECORDS);
    },

    saveHealthRecords(data) {
        this.save(this.KEYS.HEALTH_RECORDS, data);
    },

    getMedicines() {
        return this.get(this.KEYS.MEDICINES);
    },

    saveMedicines(data) {
        this.save(this.KEYS.MEDICINES, data);
    }

};