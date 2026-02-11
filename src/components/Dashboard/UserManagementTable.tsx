'use client'

export default function UserManagementTable({ users }: { users: any[] }) {
    return (
        <div className="admin-table-container">
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--pk-surface-100)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Gestão de Utilizadores</h4>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Utilizador</th>
                            <th>Papel</th>
                            <th>Telefone</th>
                            <th>Data Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div className="user-avatar">
                                            {user.full_name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--pk-text-primary)', fontSize: '0.875rem' }}>{user.full_name || 'Sem nome'}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--pk-text-tertiary)' }}>{user.email || 'Sem email'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.role === 'admin' ? 'status-available' : 'status-sold'}`} style={{ color: user.role === 'admin' ? '#7c3aed' : '#3b82f6', background: user.role === 'admin' ? '#f5f3ff' : '#eff6ff', fontSize: '10px' }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ fontSize: '0.875rem', color: 'var(--pk-text-secondary)' }}>
                                    {user.phone || 'N/A'}
                                </td>
                                <td style={{ fontSize: '0.875rem', color: 'var(--pk-text-tertiary)' }}>
                                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
