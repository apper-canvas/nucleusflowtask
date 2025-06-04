import { 
  CheckSquare, Search, Sun, Moon, Plus, Menu, X, MoreHorizontal, Check, 
  Package, Calendar, AlertTriangle, Users, Circle, Clock, CheckCircle,
  Columns, List, Trash2
} from 'lucide-react';

const iconMap = {
  CheckSquare,
  Search,
  Sun,
  Moon,
  Plus,
  Menu,
  X,
  MoreHorizontal,
  Check,
  Package,
  Calendar,
  AlertTriangle,
  Users,
  Circle,
  Clock,
  CheckCircle,
  Columns,
  List,
  Trash2
};

const ApperIcon = ({ name, className = "", ...props }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }
  
  return <IconComponent className={className} {...props} />;
};

export default ApperIcon;