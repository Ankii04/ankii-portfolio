import { useState, useEffect } from 'react';
import { X, Send, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import ConstellationBackground from './ConstellationBackground';
import WaveBackground from './WaveBackground';
import { useTheme } from '@/contexts/ThemeContext';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    github?: string;
    linkedin?: string;
}

export default function ContactModal({ isOpen, onClose, email, github, linkedin }: ContactModalProps) {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: 'd722d2a1-0c80-41d5-ab2c-623a46a1a76a',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Portfolio Contact from ${formData.name}`,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
            {/* Full Background - Completely Hides Home Page */}
            <div className="fixed inset-0">
                {theme === "dark" ? <ConstellationBackground /> : <WaveBackground />}
            </div>

            {/* Content Layer */}
            <div className="relative z-10 min-h-screen flex items-center justify-center py-12">
                <button
                    onClick={onClose}
                    className="fixed top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-20"
                >
                    <span className="text-sm">← Back to Home</span>
                </button>

                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 w-12 h-12 rounded-full bg-card/50 backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-all z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-full max-w-2xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Me</h1>
                        <p className="text-muted-foreground text-base max-w-xl mx-auto italic">
                            Let's discuss your next project or just say hello. I'm always excited to connect with fellow developers and potential collaborators.
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-6">
                            {github && (
                                <a href={github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-card/50 backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-all">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-card/50 backdrop-blur border border-border/50 flex items-center justify-center hover:border-accent/50 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}

                        </div>
                    </div>

                    <div className="bg-card/30 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your full name"
                                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-accent/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-accent/50 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Your Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell me about your project, idea, or just say hello..."
                                    rows={5}
                                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:border-accent/50 transition-colors resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                            {submitStatus === 'success' && (
                                <p className="text-green-500 text-center">Message sent successfully! 🎉</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
