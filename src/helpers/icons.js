import { IconBooks, IconBuildingSkyscraper, IconHome, IconListDetails, IconListNumbers, IconLogout, IconQuestionMark, IconSettings2, IconUsers } from "@tabler/icons-react";

const ICONS = {
    'home': IconHome,
    'company': IconBuildingSkyscraper,
    'experiences': IconListDetails,
    'books': IconBooks,
    'blogs': IconListNumbers,
    'faqs': IconQuestionMark,
    'users': IconUsers,
    'settings': IconSettings2,
    'logout': IconLogout
}

const ICON_SIZES = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};

export function Icon ({name, size="md", color="currentColor", stroke=2, className="", ariaLabel="", decorative=false}) {

    const IconComponent = ICONS[name];

    if (!IconComponent) {
        console.warn(`Icon ${name} not found`);
        return null;
    }

    return (
        <IconComponent
            size={ICON_SIZES[size] ?? size}
            stroke={stroke}
            color={color}
            className={className}
            aria-hidden={decorative}
            aria-label={!decorative ? ariaLabel || name : undefined}
            role={decorative ? "presentation" : "img"}
        />
    )

}