"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';
import CustomButton from '@/components/ui/Button';
import { Send } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface ShareSectionProps {
    onClose: () => void;
}
const ShareSection: React.FC<ShareSectionProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        confirmEmail: '',
        phone: '',
        privacyOption: 'yes'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onClose();
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#2E5C8A] mb-6">
                Receive a copy of your results by email
            </h2>
            <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-start">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Surname"
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        label="Confirm Email Address"
                        type="email"
                        value={formData.confirmEmail}
                        onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
                        required
                    />
                    <div className="w-full">
                        <label className="block text-[#2E5C8A] font-medium mb-1">
                            Phone Number
                        </label>
                        <PhoneInput
                            international
                            defaultCountry="SE"
                            value={formData.phone}
                            onChange={(value) => setFormData({ ...formData, phone: value || '' })}
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <CustomButton
                            type="button"
                            variant="reset"
                            onClick={onClose}
                        >
                            Back
                        </CustomButton>
                        <CustomButton
                            type="submit"
                            variant="runTest"
                        >
                            <div className="flex items-center gap-2">
                                <Send size={18}/>
                                <span>Send</span>
                            </div>
                        </CustomButton>
                    </div>
                </form>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                        Your privacy is safe with us. We promise not to sell, give away or otherwise disclose your
                        information to anyone, unless required by and in accordance with the law. Please choose one
                        option <span className="text-red-500">*</span>:
                    </p>
                    <div className="space-y-2">
                        <Radio
                            name="privacy"
                            value="yes"
                            checked={formData.privacyOption === 'yes'}
                            onChange={(e) => setFormData({ ...formData, privacyOption: e.target.value })}
                            label="Yes, please send me information"
                        />
                        <Radio
                            name="privacy"
                            value="no"
                            checked={formData.privacyOption === 'no'}
                            onChange={(e) => setFormData({ ...formData, privacyOption: e.target.value })}
                            label="No, please do not send me email"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareSection;