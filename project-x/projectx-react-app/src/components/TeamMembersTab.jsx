import React, { useState, useEffect } from 'react';
import { FiUsers, FiUserPlus, FiMail, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import AddMemberModal from './AddMemberModal';

const TeamMembersTab = ({ projectId, isCreator }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch team members
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5001/api/team-members/${projectId}`);
      const data = await response.json();

      if (data.success) {
        setMembers(data.members);
      } else {
        setError(data.message || 'Failed to fetch team members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load team members. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchMembers();
    }
  }, [projectId]);

  // Remove member
  const handleRemoveMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to remove this member?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/team-members/remove/${memberId}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        alert('Member removed successfully');
        fetchMembers();
      } else {
        alert(data.message || 'Failed to remove member');
      }
    } catch (err) {
      console.error('Error removing member:', err);
      alert('Failed to remove member');
    }
  };

  // Update member status
  const handleUpdateStatus = async (memberId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/team-members/update-status/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberStatus: newStatus })
      });
      const data = await response.json();

      if (data.success) {
        alert(`Member ${newStatus.toLowerCase()} successfully`);
        fetchMembers();
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#2ed573';
      case 'Pending':
        return '#ffa502';
      case 'Rejected':
        return '#ff6b6b';
      case 'Left':
        return '#a4b0be';
      default:
        return '#888';
    }
  };

  // Get initials
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <i className="fas fa-exclamation-circle"></i>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchMembers}>
          <i className="fas fa-sync"></i> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="team-members-tab">
      {/* Header */}
      <div className="team-members-header">
        <div>
          <h3>👥 Team Members</h3>
          <p>{members.length} member{members.length !== 1 ? 's' : ''} in this project</p>
        </div>
        {isCreator && (
          <button 
            className="btn btn-primary btn-add-member"
            onClick={() => setShowAddModal(true)}
          >
            <FiUserPlus size={18} /> Add Member
          </button>
        )}
      </div>

      {/* Members List */}
      {members.length === 0 ? (
        <div className="empty-members">
          <FiUsers size={48} />
          <h4>No team members yet</h4>
          <p>Invite people to collaborate on this project</p>
        </div>
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <div key={member._id} className="member-card">
              <div className="member-avatar">
                {member.userId?.profileImage ? (
                  <img src={member.userId.profileImage} alt={member.userId.fullName} />
                ) : (
                  <span className="member-initials">
                    {getInitials(member.userId?.fullName)}
                  </span>
                )}
              </div>
              <div className="member-info">
                <h4>{member.userId?.fullName || 'Unknown User'}</h4>
                <p className="member-email">
                  <FiMail size={14} /> {member.userId?.email || 'No email'}
                </p>
                <p className="member-role">{member.role}</p>
                <span 
                  className="member-status-badge"
                  style={{ 
                    backgroundColor: `${getStatusColor(member.memberStatus)}20`,
                    color: getStatusColor(member.memberStatus)
                  }}
                >
                  {member.memberStatus}
                </span>
              </div>
              {isCreator && member.memberStatus === 'Pending' && (
                <div className="member-actions">
                  <button 
                    className="btn-approve"
                    onClick={() => handleUpdateStatus(member._id, 'Active')}
                    title="Approve"
                  >
                    <FiCheck size={16} />
                  </button>
                  <button 
                    className="btn-reject"
                    onClick={() => handleUpdateStatus(member._id, 'Rejected')}
                    title="Reject"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              )}
              {isCreator && member.memberStatus !== 'Left' && member.memberStatus !== 'Pending' && (
                <button 
                  className="btn-remove-member"
                  onClick={() => handleRemoveMember(member._id)}
                  title="Remove member"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal Placeholder */}
      <AddMemberModal 
  isOpen={showAddModal} 
  onClose={() => setShowAddModal(false)} 
  projectId={projectId}
  onMemberAdded={fetchMembers}
/>
    </div>
  );
};

export default TeamMembersTab;