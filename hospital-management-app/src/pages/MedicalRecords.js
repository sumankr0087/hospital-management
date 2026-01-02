"use client"

import { useState, useEffect } from "react"

const MedicalRecords = () => {
  const [records, setRecords] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewingRecord, setViewingRecord] = useState(null)
  const [editingRecord, setEditingRecord] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    diagnosis: "",
    symptoms: "",
    prescription: "",
    testResults: "",
    notes: "",
    followUpDate: "",
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients")
    const storedDoctors = localStorage.getItem("doctors")
    const storedRecords = localStorage.getItem("medicalRecords")

    if (storedPatients) setPatients(JSON.parse(storedPatients))
    if (storedDoctors) setDoctors(JSON.parse(storedDoctors))

    if (storedRecords) {
      setRecords(JSON.parse(storedRecords))
    } else {
      // Initialize with dummy medical records
      const dummyRecords = [
        {
          id: "1",
          patientId: "1",
          patientName: "John Smith",
          doctorId: "1",
          doctorName: "Dr. Sarah Johnson",
          diagnosis: "Hypertension",
          symptoms: "High blood pressure, headaches, dizziness",
          prescription: "Lisinopril 10mg once daily",
          testResults: "Blood pressure: 145/95 mmHg",
          notes: "Patient advised to reduce salt intake and exercise regularly",
          followUpDate: "2025-02-15",
          recordDate: "2024-12-15",
        },
        {
          id: "2",
          patientId: "2",
          patientName: "Emma Wilson",
          doctorId: "2",
          doctorName: "Dr. Michael Chen",
          diagnosis: "Migraine",
          symptoms: "Severe headaches, sensitivity to light, nausea",
          prescription: "Sumatriptan 50mg as needed",
          testResults: "MRI scan: Normal, no abnormalities detected",
          notes: "Recommend stress management techniques and adequate sleep",
          followUpDate: "2025-01-20",
          recordDate: "2024-12-10",
        },
        {
          id: "3",
          patientId: "3",
          patientName: "Michael Brown",
          doctorId: "3",
          doctorName: "Dr. Emily Davis",
          diagnosis: "Type 2 Diabetes",
          symptoms: "Increased thirst, frequent urination, fatigue",
          prescription: "Metformin 500mg twice daily",
          testResults: "HbA1c: 7.5%, Fasting glucose: 145 mg/dL",
          notes: "Patient educated on diet management and blood sugar monitoring",
          followUpDate: "2025-01-30",
          recordDate: "2024-12-05",
        },
      ]
      setRecords(dummyRecords)
      localStorage.setItem("medicalRecords", JSON.stringify(dummyRecords))
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectedPatient = patients.find((p) => p.id === formData.patientId)
    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId)

    if (!selectedPatient || !selectedDoctor) {
      alert("Please select valid patient and doctor")
      return
    }

    const recordData = {
      ...formData,
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
    }

    if (editingRecord) {
      // Update existing record
      const updatedRecords = records.map((record) =>
        record.id === editingRecord.id
          ? { ...recordData, id: editingRecord.id, recordDate: editingRecord.recordDate }
          : record,
      )
      setRecords(updatedRecords)
      localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
    } else {
      // Add new record
      const newRecord = {
        ...recordData,
        id: Date.now().toString(),
        recordDate: new Date().toISOString().split("T")[0],
      }
      const updatedRecords = [...records, newRecord]
      setRecords(updatedRecords)
      localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
    }

    resetForm()
  }

  const handleView = (record) => {
    setViewingRecord(record)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    setFormData({
      patientId: record.patientId,
      doctorId: record.doctorId,
      diagnosis: record.diagnosis,
      symptoms: record.symptoms,
      prescription: record.prescription,
      testResults: record.testResults,
      notes: record.notes,
      followUpDate: record.followUpDate,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medical record?")) {
      const updatedRecords = records.filter((record) => record.id !== id)
      setRecords(updatedRecords)
      localStorage.setItem("medicalRecords", JSON.stringify(updatedRecords))
    }
  }

  const resetForm = () => {
    setFormData({
      patientId: "",
      doctorId: "",
      diagnosis: "",
      symptoms: "",
      prescription: "",
      testResults: "",
      notes: "",
      followUpDate: "",
    })
    setEditingRecord(null)
    setIsModalOpen(false)
  }

  const filteredRecords = records.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Medical Records</h1>
          <p className="text-text-secondary mt-1">View and manage patient medical records</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Record
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by patient, doctor, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 border border-border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-border p-12 text-center text-text-secondary">
            No medical records found
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{record.patientName}</h3>
                    <p className="text-sm text-text-secondary mt-1">Treated by {record.doctorName}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-text-secondary">Diagnosis</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{record.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Record Date</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{record.recordDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Follow-up Date</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{record.followUpDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Prescription</p>
                      <p className="text-sm font-medium text-text-primary mt-1">{record.prescription}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleView(record)}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEdit(record)}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-text-primary">
                {editingRecord ? "Edit Medical Record" : "Add New Medical Record"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Patient *</label>
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Doctor *</label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Diagnosis *</label>
                  <input
                    type="text"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter diagnosis"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Symptoms *</label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe symptoms"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Prescription *</label>
                  <textarea
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter prescription details"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Test Results</label>
                  <textarea
                    name="testResults"
                    value={formData.testResults}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter test results (optional)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Additional notes (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Follow-up Date</label>
                  <input
                    type="date"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-border rounded-lg hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {editingRecord ? "Update Record" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-2xl font-bold text-text-primary">Medical Record Details</h2>
              <button
                onClick={() => setViewingRecord(null)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Patient Name</p>
                  <p className="text-lg font-semibold text-text-primary">{viewingRecord.patientName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Doctor Name</p>
                  <p className="text-lg font-semibold text-text-primary">{viewingRecord.doctorName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Record Date</p>
                  <p className="text-lg font-semibold text-text-primary">{viewingRecord.recordDate}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">Follow-up Date</p>
                  <p className="text-lg font-semibold text-text-primary">{viewingRecord.followUpDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">Diagnosis</p>
                  <p className="text-base text-text-primary bg-surface p-4 rounded-lg">{viewingRecord.diagnosis}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">Symptoms</p>
                  <p className="text-base text-text-primary bg-surface p-4 rounded-lg">{viewingRecord.symptoms}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">Prescription</p>
                  <p className="text-base text-text-primary bg-surface p-4 rounded-lg">{viewingRecord.prescription}</p>
                </div>

                {viewingRecord.testResults && (
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-2">Test Results</p>
                    <p className="text-base text-text-primary bg-surface p-4 rounded-lg">{viewingRecord.testResults}</p>
                  </div>
                )}

                {viewingRecord.notes && (
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-2">Additional Notes</p>
                    <p className="text-base text-text-primary bg-surface p-4 rounded-lg">{viewingRecord.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setViewingRecord(null)}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalRecords
