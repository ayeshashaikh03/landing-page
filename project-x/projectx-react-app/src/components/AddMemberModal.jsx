import React, { useState } from 'react';
import { FiUserPlus, FiX, FiMail, FiBriefcase } from 'react-icons/fi';

const AddMemberModal = ({ isOpen, onClose, projectId, onMemberAdded }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [customRole, setCustomRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Determine final role
    const finalRole = role === 'Custom' ? customRole.trim() : role;

    if (role === 'Custom' && !finalRole) {
      setError('Please enter a custom role name');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Find user by email
      const userResponse = await fetch(`http://localhost:5001/api/auth/find-user?email=${email}`);
      const userData = await userResponse.json();

      if (!userData.success || !userData.user) {
        setError('No user found with this email. They must register first.');
        setLoading(false);
        return;
      }

      // Step 2: Add member to project
      const response = await fetch('http://localhost:5001/api/team-members/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId,
          userId: userData.user._id,
          role: finalRole,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Failed to add member');
        return;
      }

      setSuccess('✅ Member added successfully!');
      
      // Reset form
      setEmail('');
      setRole('Developer');
      setCustomRole('');

      // Notify parent to refresh list
      if (onMemberAdded) {
        onMemberAdded();
      }

      // Close modal after delay
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);

    } catch (err) {
      console.error('Error adding member:', err);
      setError('Failed to add member. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container add-member-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FiUserPlus /> Add Team Member
          </h2>
          <button className="modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="modal-message error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          {success && (
            <div className="modal-message success">
              <i className="fas fa-check-circle"></i> {success}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="memberEmail">
              <FiMail /> Email Address
            </label>
            <input
              type="email"
              id="memberEmail"
              placeholder="Enter member's email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="memberRole">
              <FiBriefcase /> Role
            </label>
            <div className="select-wrapper">
              <select
                id="memberRole"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (error) setError('');
                }}
                disabled={loading}
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Tester">Tester</option>
                <option value="Project Lead">Project Lead</option>
                <option value="Mentor">Mentor</option>
                <option value="Custom">Custom...</option>
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          {/* Show Custom Role Input if "Custom" is selected */}
          {role === 'Custom' && (
            <div className="form-group" style={{ marginTop: '-10px' }}>
              <input
                type="text"
                placeholder="Type custom role here..."
                value={customRole}
                onChange={(e) => {
                  setCustomRole(e.target.value);
                  if (error) setError('');
                }}
                disabled={loading}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #e8e8e8' }}
              />
            </div>
          )}

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-cancel" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-create"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Adding...
                </>
              ) : (
                <>
                  <FiUserPlus size={16} /> Add Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddMemberModal;