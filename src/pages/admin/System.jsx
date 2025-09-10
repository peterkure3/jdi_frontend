import { useState } from 'react';
import {
  ArrowPathIcon,
  CogIcon,
  ServerIcon,
  UsersIcon,
  EyeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function System() {
  const [refreshing, setRefreshing] = useState(false);

  const systemMetrics = {
    server: {
      status: 'online',
      uptime: '15 days, 7 hours',
      cpu: 23,
      memory: 67,
      disk: 45,
      load: 1.2
    },
    database: {
      status: 'online',
      connections: 45,
      queries: 1247,
      size: '2.4 GB',
      backup: '2024-03-16 02:00'
    },
    application: {
      version: '2.1.4',
      users: 1847,
      sessions: 234,
      errors: 3,
      lastDeploy: '2024-03-14'
    },
    security: {
      threats: 0,
      blocked: 12,
      lastScan: '2024-03-16 06:00',
      ssl: 'valid'
    }
  };

  const recentLogs = [
    { id: 1, level: 'info', message: 'User login successful', timestamp: '2024-03-16 10:30:15', user: 'admin@jdi.edu' },
    { id: 2, level: 'warning', message: 'High memory usage detected', timestamp: '2024-03-16 10:25:42', user: 'system' },
    { id: 3, level: 'info', message: 'Database backup completed', timestamp: '2024-03-16 02:00:00', user: 'system' },
    { id: 4, level: 'error', message: 'Failed to send email notification', timestamp: '2024-03-16 09:15:30', user: 'system' },
    { id: 5, level: 'info', message: 'New student registration', timestamp: '2024-03-16 08:45:12', user: 'student@jdi.edu' }
  ];

  const services = [
    { name: 'Web Server', status: 'running', port: 80, memory: '256 MB' },
    { name: 'Database', status: 'running', port: 3306, memory: '512 MB' },
    { name: 'Email Service', status: 'running', port: 587, memory: '128 MB' },
    { name: 'File Storage', status: 'running', port: 21, memory: '64 MB' },
    { name: 'Backup Service', status: 'stopped', port: 0, memory: '0 MB' },
    { name: 'Monitoring', status: 'running', port: 9090, memory: '192 MB' }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'running':
        return 'text-status-success';
      case 'warning':
        return 'text-status-warning';
      case 'offline':
      case 'stopped':
        return 'text-status-error';
      default:
        return 'text-neutral-600';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'online':
      case 'running':
        return 'bg-status-success/10 text-status-success';
      case 'warning':
        return 'bg-status-warning/10 text-status-warning';
      case 'offline':
      case 'stopped':
        return 'bg-status-error/10 text-status-error';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error':
        return 'text-status-error bg-status-error/10';
      case 'warning':
        return 'text-status-warning bg-status-warning/10';
      case 'info':
        return 'text-status-info bg-status-info/10';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">System Status</h1>
          <p className="text-neutral-600 mt-1">Monitor system health and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-xl hover:shadow-lg transition-all">
            <CogIcon className="w-4 h-4" />
            System Settings
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ServerIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className={`text-2xl font-bold ${getStatusColor(systemMetrics.server.status)}`}>
                {systemMetrics.server.status.toUpperCase()}
              </div>
              <div className="text-sm text-neutral-500">Server Status</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{systemMetrics.application.users}</div>
              <div className="text-sm text-neutral-500">Total Users</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <EyeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{systemMetrics.application.sessions}</div>
              <div className="text-sm text-neutral-500">Active Sessions</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-warning to-accent-amber rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{systemMetrics.application.errors}</div>
              <div className="text-sm text-neutral-500">Recent Errors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Server Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">CPU Usage</span>
                <span className="text-sm font-medium text-neutral-800">{systemMetrics.server.cpu}%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-status-success to-accent-lime h-2 rounded-full transition-all"
                  style={{ width: `${systemMetrics.server.cpu}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Memory Usage</span>
                <span className="text-sm font-medium text-neutral-800">{systemMetrics.server.memory}%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-status-warning to-accent-amber h-2 rounded-full transition-all"
                  style={{ width: `${systemMetrics.server.memory}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Disk Usage</span>
                <span className="text-sm font-medium text-neutral-800">{systemMetrics.server.disk}%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-accent-cyan to-accent-cyanDark h-2 rounded-full transition-all"
                  style={{ width: `${systemMetrics.server.disk}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Uptime</span>
              <span className="font-medium text-neutral-800">{systemMetrics.server.uptime}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Database Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Status</span>
              <span className={`text-sm font-medium ${getStatusColor(systemMetrics.database.status)}`}>
                {systemMetrics.database.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Active Connections</span>
              <span className="text-sm font-medium text-neutral-800">{systemMetrics.database.connections}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Queries/Hour</span>
              <span className="text-sm font-medium text-neutral-800">{systemMetrics.database.queries}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Database Size</span>
              <span className="text-sm font-medium text-neutral-800">{systemMetrics.database.size}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Last Backup</span>
              <span className="text-sm font-medium text-neutral-800">{systemMetrics.database.backup}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Services Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-neutral-800">{service.name}</div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(service.status)}`}>
                  {service.status}
                </span>
              </div>
              <div className="space-y-1 text-sm text-neutral-600">
                <div>Port: {service.port || 'N/A'}</div>
                <div>Memory: {service.memory}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800">Recent System Logs</h3>
          <button className="text-brand-primary hover:text-brand-primaryDark text-sm font-medium transition-colors">
            View All Logs
          </button>
        </div>
        <div className="space-y-3">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-3 bg-neutral-50 rounded-lg">
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium uppercase ${getLogLevelColor(log.level)}`}>
                {log.level}
              </span>
              <div className="flex-1">
                <div className="text-sm text-neutral-800">{log.message}</div>
                <div className="text-xs text-neutral-500 mt-1">
                  {log.timestamp} • {log.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Status */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Security Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-status-success/5 rounded-lg">
            <div className="text-2xl font-bold text-status-success">{systemMetrics.security.threats}</div>
            <div className="text-sm text-neutral-600">Active Threats</div>
          </div>
          <div className="text-center p-4 bg-status-warning/5 rounded-lg">
            <div className="text-2xl font-bold text-status-warning">{systemMetrics.security.blocked}</div>
            <div className="text-sm text-neutral-600">Blocked Attempts</div>
          </div>
          <div className="text-center p-4 bg-status-info/5 rounded-lg">
            <div className="text-sm font-bold text-status-info">{systemMetrics.security.lastScan}</div>
            <div className="text-sm text-neutral-600">Last Security Scan</div>
          </div>
          <div className="text-center p-4 bg-status-success/5 rounded-lg">
            <div className="text-sm font-bold text-status-success">{systemMetrics.security.ssl.toUpperCase()}</div>
            <div className="text-sm text-neutral-600">SSL Certificate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
