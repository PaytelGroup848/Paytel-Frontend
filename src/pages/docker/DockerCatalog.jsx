import { useState } from 'react';
import { FaDocker, FaRocket, FaDatabase, FaServer, FaShoppingCart, FaSearch, FaSpinner, FaWordpress } from 'react-icons/fa';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { Earth } from 'lucide-react';
import { GrMysql } from "react-icons/gr";
import { SiMongodb, SiNginx, SiPortainer, SiPostgresql } from 'react-icons/si';
import { DiRedis } from "react-icons/di";
import { RiNodejsLine } from "react-icons/ri";

const DOCKER_CATALOG = [
  {
    id: 'nginx',
    name: 'Nginx',
    icon:<SiNginx className='text-blue-900 text-4xl' />,
    description: 'High-performance web server, reverse proxy, and load balancer',
    category: 'Web Server',
    image: 'nginx',
    tag: 'latest',
    defaultPort: 80,
    popular: true,
    config: {
      ports: [{ hostPort: '80', containerPort: '80' }],
      env: [],
      restartPolicy: 'always'
    }
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: <GrMysql className='text-blue-500 text-4xl'/>,
    description: 'Popular open-source relational database management system',
    category: 'Database',
    image: 'mysql',
    tag: '8.0',
    defaultPort: 3306,
    popular: true,
    config: {
      ports: [{ hostPort: '3306', containerPort: '3306' }],
      env: [
        { key: 'MYSQL_ROOT_PASSWORD', value: 'root123', required: true },
        { key: 'MYSQL_DATABASE', value: 'app_db', required: false }
      ],
      restartPolicy: 'always'
    }
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    icon: <SiPostgresql className='text-gray-600 text-4xl'/>,
    description: 'Advanced open-source relational database',
    category: 'Database',
    image: 'postgres',
    tag: 'latest',
    defaultPort: 5432,
    config: {
      ports: [{ hostPort: '5432', containerPort: '5432' }],
      env: [
        { key: 'POSTGRES_PASSWORD', value: 'postgres123', required: true },
        { key: 'POSTGRES_DB', value: 'app_db', required: false },
        { key: 'POSTGRES_USER', value: 'admin', required: false }
      ],
      restartPolicy: 'always'
    }
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: <DiRedis className='text-red-600 text-5xl'/>,
    description: 'In-memory data structure store, used as database, cache, and message broker',
    category: 'Cache',
    image: 'redis',
    tag: 'alpine',
    defaultPort: 6379,
    popular: true,
    config: {
      ports: [{ hostPort: '6379', containerPort: '6379' }],
      env: [],
      restartPolicy: 'always'
    }
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: <SiMongodb className='text-green-600 text-4xl' />,
    description: 'NoSQL document database',
    category: 'Database',
    image: 'mongo',
    tag: 'latest',
    defaultPort: 27017,
    config: {
      ports: [{ hostPort: '27017', containerPort: '27017' }],
      env: [
        { key: 'MONGO_INITDB_ROOT_USERNAME', value: 'root', required: false },
        { key: 'MONGO_INITDB_ROOT_PASSWORD', value: 'root123', required: true }
      ],
      restartPolicy: 'always'
    }
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    icon: <FaWordpress className='text-purple-800 text-4xl' />,
    description: 'Popular content management system for websites and blogs',
    category: 'CMS',
    image: 'wordpress',
    tag: 'latest',
    defaultPort: 80,
    popular: true,
    config: {
      ports: [{ hostPort: '8080', containerPort: '80' }],
      env: [
        { key: 'WORDPRESS_DB_HOST', value: 'mysql', required: true },
        { key: 'WORDPRESS_DB_USER', value: 'root', required: true },
        { key: 'WORDPRESS_DB_PASSWORD', value: 'root123', required: true },
        { key: 'WORDPRESS_DB_NAME', value: 'wordpress', required: true }
      ],
      restartPolicy: 'always'
    }
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: <RiNodejsLine className='text-green-800 text-4xl'/>,
    description: 'JavaScript runtime built on Chrome V8 engine',
    category: 'Runtime',
    image: 'node',
    tag: '18-alpine',
    defaultPort: 3000,
    config: {
      ports: [{ hostPort: '3000', containerPort: '3000' }],
      env: [{ key: 'NODE_ENV', value: 'production', required: false }],
      restartPolicy: 'always'
    }
  },
//   {
//     id: 'ubuntu',
//     name: 'Ubuntu',
//     icon: '🐧',
//     description: 'Popular Linux distribution for development and testing',
//     category: 'OS',
//     image: 'ubuntu',
//     tag: '22.04',
//     defaultPort: null,
//     config: {
//       ports: [],
//       env: [],
//       restartPolicy: 'no',
//       commands: ['sleep', 'infinity']
//     }
//   },
  {
    id: 'portainer',
    name: 'Portainer',
    icon: <SiPortainer className='text-blue-800 text-5xl' />,
    description: 'Lightweight container management UI',
    category: 'Management',
    image: 'portainer/portainer-ce',
    tag: 'latest',
    defaultPort: 9443,
    config: {
      ports: [{ hostPort: '9443', containerPort: '9443' }],
      env: [],
      restartPolicy: 'always'
    }
  }
];

export default function DockerCatalog({ instanceId, onContainerCreated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deploying, setDeploying] = useState(null);
  const [showCustomPort, setShowCustomPort] = useState(null);
  const [customPort, setCustomPort] = useState('');

  const categories = ['all', 'Web Server', 'Database', 'Cache', 'CMS', 'Runtime',  'Management'];

  const filteredImages = DOCKER_CATALOG.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          image.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const deployContainer = async (image, customHostPort = null) => {
    setDeploying(image.id);
    
    try {
      const containerName = `${image.id}_${Date.now()}`;
      let ports = [...image.config.ports];
      
      // Use custom port if provided
      if (customHostPort && image.defaultPort) {
        ports = [{ hostPort: customHostPort, containerPort: image.defaultPort }];
      }
      
      // Handle environment variables - replace required placeholders
      const envVars = {};
      if (image.config.env && image.config.env.length > 0) {
        image.config.env.forEach(env => {
          if (env.required && env.value === '{{ASK}}') {
            const userValue = prompt(`Enter value for ${env.key}:`, env.value);
            if (userValue) envVars[env.key] = userValue;
          } else {
            envVars[env.key] = env.value;
          }
        });
      }
      
      const payload = {
        containerName: containerName,
        imageName: image.image,
        imageTag: image.tag,
        ports: ports,
        env: envVars,
        restartPolicy: image.config.restartPolicy
      };
      
      // Add commands for Ubuntu
      if (image.id === 'ubuntu' && image.config.commands) {
        payload.commands = image.config.commands;
      }
      
      
      const response = await api.post(`/vps/instances/${instanceId}/docker/containers`, payload);
      
      if (response.data?.success) {
        toast.success(`${image.name} container deployed successfully!`);
        onContainerCreated?.();
      }
    } catch (error) {
      console.error('Deploy failed:', error);
      toast.error(error.response?.data?.message || `Failed to deploy ${image.name}`);
    } finally {
      setDeploying(null);
      setShowCustomPort(null);
      setCustomPort('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
           
            One-Click Apps
          </h2>
          <p className="text-sm text-slate-500">Deploy popular applications with a single click</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Apps' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{image.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-800">{image.name}</h3>
                  {image.popular && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Popular</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-2">{image.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-mono">{image.image}</span>
                  <span className="text-xs text-slate-400">v{image.tag}</span>
                </div>
                
                <div className="flex gap-2">
                  {image.defaultPort && (
                    <button
                      onClick={() => deployContainer(image, null)}
                      disabled={deploying === image.id}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {deploying === image.id ? <FaSpinner className="animate-spin" /> : <FaDocker />}
                      Deploy
                    </button>
                  )}
                  {image.defaultPort && (
                    <button
                      onClick={() => setShowCustomPort(showCustomPort === image.id ? null : image.id)}
                      disabled={deploying === image.id}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm hover:bg-slate-50"
                    >
                      Custom Port
                    </button>
                  )}
                </div>
                
                {showCustomPort === image.id && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Port number"
                        value={customPort}
                        onChange={(e) => setCustomPort(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded"
                      />
                      <button
                        onClick={() => {
                          if (customPort) {
                            deployContainer(image, customPort);
                          } else {
                            toast.error('Please enter a port number');
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Deploy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}