

interface AvatarProps {
    name?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ClientAvatar({ name, size = 'lg', className = '' }: AvatarProps) {
    const initials = name ? name.split(' ').map(n => n.charAt(0).toUpperCase()).join('') : 'NA';
    
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 rounded-full backdrop-blur-sm border border-emerald-500/30 ${sizeClasses[size]} ${className}`}>
            <span className="font-medium text-emerald-100">{initials}</span>
        </div>
    );
}


